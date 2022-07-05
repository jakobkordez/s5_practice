import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/quiz/cubit/quiz_cubit.dart';
import 'package:s5_practice/src/home_screen.dart';

import 'models/question.dart';
import 'quiz/quiz_screen.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocProvider(
        create: (context) => QuestionsCubit()..load(),
        child: MaterialApp(
          title: 'Izpitna vprašanja za radioamaterje',
          theme: ThemeData(
            // colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.blue),
            cardTheme: CardTheme(
              elevation: 4,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
          initialRoute: '/',
          routes: <String, WidgetBuilder>{
            '/': (context) => const HomeScreen(),
          },
          onGenerateRoute: (settings) {
            if (settings.name == '/quiz' && settings.arguments is QuizState) {
              return MaterialPageRoute(
                builder: (context) =>
                    QuizScreen(quizState: settings.arguments as QuizState),
                settings: settings,
              );
            }

            return null;
          },
        ),
      );
}
