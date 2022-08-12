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
              if (constraints.maxWidth > 600) {
                return Row(
                  children: [
                    Expanded(
                      flex: 2,
                      child: _CategoryInput(),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      flex: 1,
                      child: _QuestionNumberInput(),
                    ),
                  ],
                );
              }

              return Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  _CategoryInput(),
                  const SizedBox(height: 15),
                  _QuestionNumberInput(),
                ],
              );
            },
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
                      title: generatorState.category == null
                          ? 'Vaja - Vse kategorije'
                          : 'Vaja - ${generatorState.category!.title}',
                      questions:
                          questionsState.getRandom(generatorState.category?.id),
                      count: generatorState.practiceQuestionCount,
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
          builder: (context, gstate) {
            qstate as QuestionsLoaded;

            return DropdownButtonFormField<Category>(
              isExpanded: true,
              value: gstate.category,
              decoration: InputDecoration(
                isDense: true,
                enabled: gstate.singleCategory,
                labelText: 'Izberi področje',
                suffixIcon: gstate.category == null
                    ? null
                    : IconButton(
                        splashRadius: 18,
                        icon: const Icon(Icons.clear),
                        onPressed: () => context
                            .read<GeneratorCubit>()
                            .setSingleCategory(false),
                      ),
              ),
              items: qstate.categories
                  .map((e) => DropdownMenuItem(
                        value: e,
                        child: Text(
                          e.title,
                          overflow: TextOverflow.ellipsis,
                        ),
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
            previous.practiceQuestionCount != current.practiceQuestionCount,
        builder: (context, state) => TextFormField(
          initialValue: '${state.practiceQuestionCount}',
          decoration: const InputDecoration(
            labelText: 'Število vprašanj',
          ),
          inputFormatters: [FilteringTextInputFormatter.digitsOnly],
          keyboardType: TextInputType.number,
          onChanged: context.read<GeneratorCubit>().setPracticeQuestionCount,
        ),
      );
}
