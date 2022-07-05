import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/quiz/cubit/quiz_cubit.dart';

import '../cubit/questions_cubit.dart';
import '../models/category.dart';
import 'cubit/generator_cubit.dart';

class GeneratorForm extends StatelessWidget {
  const GeneratorForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider(
        create: (context) => GeneratorCubit(),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: DefaultTabController(
              length: 2,
              child: Column(
                children: [
                  Text(
                    'Generator vprašanj',
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: 10),
                  const TabBar(
                    labelColor: Colors.black,
                    labelPadding: EdgeInsets.all(5),
                    tabs: [
                      Text('Vaja'),
                      Text('Preizkus uspeha'),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Expanded(
                    child: TabBarView(
                      children: [
                        PracticeTab(),
                        TestTab(),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}

class PracticeTab extends StatelessWidget {
  const PracticeTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _CategoryOnlyInput(),
          _CategoryInput(),
          _QuestionNumberInput(),
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

class _CategoryOnlyInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text('Generiraj vprašanja le iz določenega področja:'),
          const SizedBox(width: 10),
          BlocBuilder<GeneratorCubit, GeneratorState>(
            buildWhen: (previous, current) {
              previous as GeneratorPractice;
              current as GeneratorPractice;
              return previous.singleCategory != current.singleCategory;
            },
            builder: (context, state) {
              state as GeneratorPractice;
              return Checkbox(
                value: state.singleCategory,
                onChanged: (value) {
                  if (value == null) return;
                  context.read<GeneratorCubit>().setSingleCategory(value);
                },
              );
            },
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
          builder: (context, gstate) {
            qstate as QuestionsLoaded;
            gstate as GeneratorPractice;

            return DropdownButtonFormField<Category>(
              value: gstate.category,
              decoration: InputDecoration(
                enabled: gstate.singleCategory,
                labelText: 'Izberi področje',
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
        builder: (context, state) => SizedBox(
          width: 150,
          child: TextFormField(
            initialValue: '${state.questionCount}',
            decoration: const InputDecoration(
              labelText: 'Število vprašanj',
            ),
            inputFormatters: [FilteringTextInputFormatter.digitsOnly],
            keyboardType: TextInputType.number,
            onChanged: (value) => context
                .read<GeneratorCubit>()
                .setQuestionCount(int.tryParse(value) ?? 0),
          ),
        ),
      );
}

class TestTab extends StatelessWidget {
  const TestTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: const [
          Text('Kandidati za radioamaterja razreda A opravljajo izpit, ki je '
              'sestavljen iz 60 različnih vprašanj. Vsako vprašanje ima 3 možne odgovore, od katerih je '
              'samo en pravilen. Kandidat ima na voljo 90 minut za reševanje izpitne pole. Kandidat mora '
              'pravilno odgovoriti vsaj na 36 vprašanj (60%).')
        ],
      );
}
