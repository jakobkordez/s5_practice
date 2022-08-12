import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../cubit/questions_cubit.dart';
import '../quiz/cubit/quiz_cubit.dart';
import 'cubit/generator_cubit.dart';

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
              Expanded(child: _TestQuestionNumberInput()),
              const SizedBox(width: 10),
              Expanded(child: _DurationInput()),
            ],
          ),
          const SizedBox(height: 20),
          Container(
            alignment: Alignment.bottomRight,
            child: ElevatedButton(
              onPressed: () {
                final generatorState = context.read<GeneratorCubit>().state;
                final questionsState =
                    context.read<QuestionsCubit>().state as QuestionsLoaded;
                Navigator.pushNamed(context, '/quiz',
                    arguments: QuizState(
                      title: 'Preizkus uspeha',
                      questions: questionsState
                          .getRandom(null, true)
                          .take(generatorState.testQuestionCount)
                          .toList(),
                      count: generatorState.testQuestionCount,
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

class _TestQuestionNumberInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<GeneratorCubit, GeneratorState>(
        buildWhen: (previous, current) =>
            previous.testQuestionCount != current.testQuestionCount,
        builder: (context, state) => TextFormField(
          initialValue: '${state.testQuestionCount}',
          decoration: const InputDecoration(
            labelText: 'Število vprašanj',
          ),
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          keyboardType: TextInputType.number,
          onChanged: context.read<GeneratorCubit>().setTestQuestionCount,
        ),
      );
}

class _DurationInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) =>
      BlocBuilder<GeneratorCubit, GeneratorState>(
        buildWhen: (previous, current) =>
            previous.timerDuration != current.timerDuration,
        builder: (context, state) => TextFormField(
          initialValue: '${state.timerDuration.inMinutes}',
          decoration: const InputDecoration(
            suffixText: 'min',
            labelText: 'Čas za reševanje',
          ),
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          keyboardType: TextInputType.number,
          onChanged: context.read<GeneratorCubit>().setDuration,
        ),
      );
}
