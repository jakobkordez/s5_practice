import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../cubit/questions_cubit.dart';
import '../models/category.dart';
import '../quiz/cubit/quiz_cubit.dart';
import 'cubit/generator_cubit.dart';

class PracticeTab extends StatelessWidget {
  const PracticeTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Vaja',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 15),
          const Text(
              'Izberi pogročje in vpiši število vprašanj, ki jih želiš generirati. '
              'Če želiš generirati vprašanja iz vseh področij, pusti polje za področje prazno.'),
          const SizedBox(height: 20),
          LayoutBuilder(
            builder: (context, constraints) {
              final mxW = constraints.maxWidth - 80;
              return Wrap(
                alignment: WrapAlignment.center,
                spacing: 20,
                crossAxisAlignment: WrapCrossAlignment.end,
                children: [
                  Container(
                    width: mxW * 2 / 3,
                    constraints: const BoxConstraints(minWidth: 500),
                    child: _CategoryInput(),
                  ),
                  Container(
                    width: mxW / 3,
                    constraints: const BoxConstraints(minWidth: 100),
                    child: _QuestionNumberInput(),
                  ),
                ],
              );
            },
          ),
          const SizedBox(height: 20),
          Container(
            alignment: Alignment.bottomRight,
            child: ElevatedButton(
              onPressed: () {
                final generatorState =
                    context.read<GeneratorCubit>().state as GeneratorPractice;
                final questionsState =
                    context.read<QuestionsCubit>().state as QuestionsLoaded;
                Navigator.pushNamed(context, '/quiz',
                    arguments: QuizState(
                      title: generatorState.category == null
                          ? 'Vaja - Vse kategorije'
                          : 'Vaja - ${generatorState.category!.title}',
                      questions:
                          questionsState.getRandom(generatorState.category?.id),
                      count: generatorState.questionCount,
                      revealInstantly: true,
                    ));
              },
              child: const Text('Začni'),
            ),
          ),
        ],
      );
}

class _CategoryInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<QuestionsCubit, QuestionsState>(
        builder: (context, qstate) =>
            BlocBuilder<GeneratorCubit, GeneratorState>(
          buildWhen: (previous, current) => current is GeneratorPractice,
          builder: (context, gstate) {
            qstate as QuestionsLoaded;
            gstate as GeneratorPractice;

            return DropdownButtonFormField<Category>(
              value: gstate.category,
              decoration: InputDecoration(
                enabled: gstate.singleCategory,
                labelText: 'Izberi področje',
                suffixIcon: gstate.category == null
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () => context
                            .read<GeneratorCubit>()
                            .setSingleCategory(false),
                      ),
              ),
              items: qstate.categories
                  .map((e) => DropdownMenuItem(
                        value: e,
                        child: Text(e.title),
                      ))
                  .toList(),
              onChanged: (value) {
                if (value == null) return;
                context.read<GeneratorCubit>().setCategory(value);
              },
            );
          },
        ),
      );
}

class _QuestionNumberInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<GeneratorCubit, GeneratorState>(
        buildWhen: (previous, current) =>
            previous.questionCount != current.questionCount,
        builder: (context, state) => TextFormField(
          initialValue: '${state.questionCount}',
          decoration: const InputDecoration(
            labelText: 'Število vprašanj',
          ),
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          keyboardType: TextInputType.number,
          onChanged: context.read<GeneratorCubit>().setQuestionCount,
        ),
      );
}

class TestTab extends StatelessWidget {
  const TestTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Preizkus uspeha',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 15),
          const Text(
              'Kandidati za radioamaterja razreda A opravljajo izpit, ki je '
              'sestavljen iz 60 različnih vprašanj. Vsako vprašanje ima 3 možne odgovore, od katerih je '
              'samo en pravilen. Kandidat ima na voljo 90 minut za reševanje izpitne pole. Kandidat mora '
              'pravilno odgovoriti vsaj na 36 vprašanj (60%).'),
          const SizedBox(height: 20),
          const Text(
              'Preizkus uspeha NE bo vseboval vprašanj s področja "Risanje"!'),
          const SizedBox(height: 20),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Expanded(child: _QuestionNumberInput()),
              const SizedBox(width: 20),
              Expanded(child: _DurationInput()),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            alignment: Alignment.bottomRight,
            child: ElevatedButton(
              onPressed: () {
                final generatorState =
                    context.read<GeneratorCubit>().state as GeneratorTest;
                final questionsState =
                    context.read<QuestionsCubit>().state as QuestionsLoaded;
                Navigator.pushNamed(context, '/quiz',
                    arguments: QuizState(
                      title: 'Preizkus uspeha',
                      questions: questionsState
                          .getRandom(null, true)
                          .take(generatorState.questionCount)
                          .toList(),
                      count: generatorState.questionCount,
                      duration: generatorState.timerDuration,
                      revealInstantly: false,
                    ));
              },
              child: const Text('Naprej'),
            ),
          ),
        ],
      );
}

class _DurationInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<GeneratorCubit, GeneratorState>(
        buildWhen: (previous, current) {
          if (current is! GeneratorTest) return false;
          if (previous is! GeneratorTest) return true;
          return previous.timerDuration != current.timerDuration;
        },
        builder: (context, state) {
          state as GeneratorTest;

          return TextFormField(
            initialValue: '${state.timerDuration.inMinutes}',
            decoration: const InputDecoration(
              suffixText: 'min',
              labelText: 'Čas za reševanje',
            ),
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            keyboardType: TextInputType.number,
            onChanged: context.read<GeneratorCubit>().setDuration,
          );
        },
      );
}
