import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/generator/generator_form.dart';

import 'components/sized_card.dart';
import 'generator/cubit/generator_cubit.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  final GeneratorCubit _generatorCubit = GeneratorCubit();

  static const _tabs = [
    Text('Vaja'),
    Text('Preizkus uspeha'),
  ];

  late final TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabs.length, vsync: this);
    _tabController.addListener(() {
      switch (_tabController.index) {
        case 0:
          _generatorCubit.setPractice();
          break;
        case 1:
          _generatorCubit.setTest();
          break;
        default:
      }
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: const Text('Izpitna vprašanja za radioamaterje'),
          bottom: TabBar(
            controller: _tabController,
            labelPadding: const EdgeInsets.all(10),
            tabs: _tabs,
          ),
        ),
        body: BlocBuilder<QuestionsCubit, QuestionsState>(
          builder: (context, state) => state is! QuestionsLoaded
              ? const Center(child: CircularProgressIndicator())
              : BlocProvider.value(
                  value: _generatorCubit,
                  child: TabBarView(
                    controller: _tabController,
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
        ),
      );
}
