import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/quiz/cubit/quiz_cubit.dart';

import 'question_card.dart';

class QuizScreen extends StatelessWidget {
  final QuizState quizState;

  const QuizScreen({
    Key? key,
    required this.quizState,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider(
        create: (context) {
          final q = QuizCubit(quizState);
          if (quizState.duration == null) q.start();
          return q;
        },
        child: Scaffold(
          appBar: AppBar(
            title: BlocBuilder<QuizCubit, QuizState>(
              buildWhen: (previous, current) => previous.title != current.title,
              builder: (context, state) => Text(state.title),
            ),
          ),
          body: BlocBuilder<QuizCubit, QuizState>(
            builder: (context, state) {
              if (state.startTime == null) {
                return Center(
                  child: ElevatedButton(
                    child: const Text('Start'),
                    onPressed: () => context.read<QuizCubit>().start(),
                  ),
                );
              }

              return ListView.separated(
                padding: const EdgeInsets.all(20),
                itemCount: state.count +
                    (state.count < state.questions.length ? 1 : 0),
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  if (index == state.count) {
                    return Center(
                      child: ElevatedButton(
                        child: const Text('Več'),
                        onPressed: () => context.read<QuizCubit>().extend(),
                      ),
                    );
                  }

                  return QuestionCard(qIndex: index);
                },
              );
            },
          ),
        ),
      );
}
