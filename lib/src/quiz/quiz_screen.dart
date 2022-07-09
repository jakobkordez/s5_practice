import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/components/sized_card.dart';
import 'package:s5_practice/src/quiz/cubit/quiz_cubit.dart';
import 'package:timer_builder/timer_builder.dart';

import 'question_card.dart';

class QuizScreen extends StatefulWidget {
  final QuizState quizState;

  const QuizScreen({
    Key? key,
    required this.quizState,
  }) : super(key: key);

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  late final QuizCubit _quizCubit;
  Timer? _timer;

  @override
  void initState() {
    super.initState();

    _quizCubit = QuizCubit(widget.quizState);
    if (widget.quizState.duration != null) {
      _timer = Timer.periodic(
        widget.quizState.duration!,
        (_) => _quizCubit.finish(),
      );
    } else {
      _quizCubit.start();
    }
  }

  @override
  void dispose() {
    super.dispose();
    _timer?.cancel();
  }

  @override
  Widget build(BuildContext context) => WillPopScope(
        onWillPop: () async {
          final state = _quizCubit.state;
          if (state.duration == null ||
              state.startTime == null ||
              state.endTime != null) return true;

          return await showDialog<bool>(
                context: context,
                builder: (context) => AlertDialog(
                  title: const Text('Zapusti kviz?'),
                  content: const Text(
                      'Če zapustite to stran, bodo vaši odgovori izgubljeni.'),
                  actions: <Widget>[
                    TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: const Text('Ostani'),
                    ),
                    TextButton(
                      style: TextButton.styleFrom(primary: Colors.red),
                      onPressed: () => Navigator.pop(context, true),
                      child: const Text('Zapusti'),
                    ),
                  ],
                ),
              ) ??
              false;
        },
        child: BlocProvider.value(
          value: _quizCubit,
          child: Scaffold(
            appBar: AppBar(
              title: _Title(),
              actions: [
                _TimerCountdown(),
              ],
            ),
            body: BlocBuilder<QuizCubit, QuizState>(
              buildWhen: (previous, current) =>
                  previous.startTime != current.startTime ||
                  previous.endTime != current.endTime,
              builder: (context, state) {
                if (state.startTime == null) return _StartPage();

                if (state.endTime != null) return _ResultPage();

                return _QuizPage();
              },
            ),
          ),
        ),
      );
}

class _Title extends StatelessWidget {
  @override
  Widget build(BuildContext context) => BlocBuilder<QuizCubit, QuizState>(
        buildWhen: (previous, current) => previous.title != current.title,
        builder: (context, state) => Text(state.title),
      );
}

class _TimerCountdown extends StatelessWidget {
  @override
  Widget build(BuildContext context) => BlocBuilder<QuizCubit, QuizState>(
        buildWhen: (previous, current) =>
            previous.startTime != current.startTime ||
            previous.endTime != current.endTime,
        builder: (context, state) {
          if (state.duration == null ||
              state.startTime == null ||
              state.endTime != null) {
            return const SizedBox();
          }

          return Card(
            elevation: 0,
            margin: const EdgeInsets.symmetric(
              horizontal: 15,
              vertical: 10,
            ),
            child: Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              child: TimerBuilder.periodic(
                const Duration(milliseconds: 500),
                builder: (context) {
                  final dur = state.startTime!
                      .add(state.duration!)
                      .difference(DateTime.now());
                  return Text(
                    '${dur.inSeconds ~/ 60}:${'${dur.inSeconds % 60}'.padLeft(2, '0')}',
                    style: Theme.of(context).textTheme.titleMedium,
                  );
                },
              ),
            ),
          );
        },
      );
}

class _StartPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: SizedCard(
          child: Center(
            child: ElevatedButton(
              child: const Text('Začni preizkus'),
              onPressed: () => context.read<QuizCubit>().start(),
            ),
          ),
        ),
      );
}

class _ResultPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: SizedCard(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Rezultat',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 15),
              BlocBuilder<QuizCubit, QuizState>(
                builder: (context, state) {
                  final correct = state.score!;
                  final count = state.count;
                  final correctPercentage = correct / count * 100;
                  final corrPerStr = correctPercentage.toStringAsFixed(1);
                  return Text(
                    '$correct / $count ($corrPerStr %)',
                    style: Theme.of(context).textTheme.headlineMedium!.copyWith(
                          color: correctPercentage >= 60
                              ? Colors.green
                              : Colors.red,
                        ),
                  );
                },
              ),
              const SizedBox(height: 15),
              Center(
                child: ElevatedButton(
                  child: const Text('Nazaj domov'),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
            ],
          ),
        ),
      );
}

class _QuizPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => BlocBuilder<QuizCubit, QuizState>(
        builder: (context, state) {
          final moreQuestions = state.count < state.questions.length;
          final isTest = state.duration != null;
          final extraLine = moreQuestions || isTest;

          return ListView.separated(
            padding: const EdgeInsets.all(20),
            shrinkWrap: true,
            itemCount: state.count + (extraLine ? 1 : 0),
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (context, index) {
              if (index == state.count) {
                if (moreQuestions) {
                  return Center(
                    child: ElevatedButton(
                      child: const Text('Več'),
                      onPressed: () => context.read<QuizCubit>().extend(),
                    ),
                  );
                }

                return Center(
                  child: ElevatedButton(
                    child: const Text('Končaj'),
                    onPressed: () => context.read<QuizCubit>().finish(),
                  ),
                );
              }

              return QuestionCard(qIndex: index);
            },
          );
        },
      );
}
