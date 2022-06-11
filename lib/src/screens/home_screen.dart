import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/models/category.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Izpitna vprašanja za radioamaterje')),
        body: Padding(
          padding: const EdgeInsets.all(20),
          child: BlocBuilder<QuestionsCubit, QuestionsState>(
            builder: (context, state) => state is! QuestionsLoaded
                ? const Center(child: CircularProgressIndicator())
                : Card(
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
                            Expanded(
                              child: TabBarView(
                                children: [
                                  VajaTab(categories: state.categories),
                                  const TestTab(),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
          ),
        ),
      );
}

class VajaTab extends StatelessWidget {
  final List<Category> categories;

  const VajaTab({
    Key? key,
    required this.categories,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text('Generiraj vprašanja le iz določenega področja:'),
              const SizedBox(width: 10),
              Checkbox(
                value: false,
                // TODO
                onChanged: (value) {},
              ),
            ],
          ),
          DropdownButtonFormField<Category>(
            decoration: const InputDecoration(
              labelText: 'Izberi področje',
            ),
            items: categories
                .map((e) => DropdownMenuItem(
                      value: e,
                      child: Text('${e.id}. ${e.title}'),
                    ))
                .toList(),
            // TODO
            onChanged: (value) {},
          ),
          const SizedBox(height: 20),
          Container(
            alignment: Alignment.bottomRight,
            child: ElevatedButton(
              // TODO
              onPressed: () {},
              child: const Text('Začni'),
            ),
          ),
        ],
      );
}

class TestTab extends StatelessWidget {
  const TestTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Column(
        mainAxisSize: MainAxisSize.min,
      );
}
