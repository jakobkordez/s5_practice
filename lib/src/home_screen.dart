import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/generator/generator_form.dart';

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
                : const GeneratorForm(),
          ),
        ),
      );
}
