import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';

import '../components/question_card.dart';
import '../models/question.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(title: const Text('Izpitna vprašanja za radioamaterje')),
        body: BlocBuilder<QuestionsCubit, QuestionsState>(
          builder: (context, state) => state is! QuestionsLoaded
              ? const Center(child: CircularProgressIndicator())
              : ListView.separated(
                  padding: const EdgeInsets.all(20),
                  itemCount: state.questions.length,
                  itemBuilder: (context, index) => QuestionCard(
                    question: state.questions[index],
                  ),
                  separatorBuilder: (_, __) => const SizedBox(height: 15),
                ),
        ),
      );
}
