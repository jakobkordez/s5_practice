import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:s5_practice/src/cubit/questions_cubit.dart';
import 'package:s5_practice/src/screens/home_screen.dart';

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
          home: const HomeScreen(),
        ),
      );
}
