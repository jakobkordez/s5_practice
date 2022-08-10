import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/generator/generator_form.dart';

import 'components/sized_card.dart';
import 'generator/cubit/generator_cubit.dart';

class HomeScreen extends StatelessWidget {
  static const _tabs = [
    Text('Vaja'),
    Text('Preizkus uspeha'),
  ];

  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Izpitna vprašanja za radioamaterje')),
        body: BlocBuilder<QuestionsCubit, QuestionsState>(
          builder: (context, state) => state is! QuestionsLoaded
              ? const Center(child: CircularProgressIndicator())
              : BlocProvider(
                  create: (_) => GeneratorCubit(),
                  child: DefaultTabController(
                    length: _tabs.length,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Center(
                          child: ConstrainedBox(
                            constraints: const BoxConstraints(maxWidth: 800),
                            child: TabBar(
                              labelColor: Theme.of(context).colorScheme.primary,
                              unselectedLabelColor: Colors.grey.shade700,
                              labelStyle: const TextStyle(fontSize: 16),
                              labelPadding: const EdgeInsets.all(12),
                              tabs: _tabs,
                            ),
                          ),
                        ),
                        const Divider(height: 0),
                        Expanded(
                          child: TabBarView(
                            children: [
                              const PracticeTab(),
                              const TestTab(),
                            ]
                                .map(
                                  (e) => SingleChildScrollView(
                                    padding: const EdgeInsets.all(20),
                                    child: SizedCard(child: e),
                                  ),
                                )
                                .toList(),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
        ),
      );
}
