import 'dart:math';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../models/question.dart';

part 'quiz_state.dart';

class QuizCubit extends Cubit<QuizState> {
  QuizCubit(QuizState quizState) : super(quizState);

  void start() => emit(state.copyWith(
        answers: state.revealInstantly
            ? null
            : List.filled(state.questions.length, null),
        revealed: state.revealInstantly
            ? List.filled(state.questions.length, null)
            : null,
        startTime: DateTime.now(),
      ));

  void answer(int index, int answer) {
    if (state.revealInstantly) {
      final revealed = state.revealed!.toList();
      revealed[index] = ((revealed[index]?.toSet() ?? {})..add(answer));

      emit(state.copyWith(revealed: revealed));

      return;
    }

    final answers = state.answers!.toList();
    answers[index] = answer;

    emit(state.copyWith(answers: answers));
  }

  void extend() => emit(state.copyWith(count: state.count + state.firstCount));

  void finish() => emit(state.copyWith(endTime: DateTime.now()));
}
