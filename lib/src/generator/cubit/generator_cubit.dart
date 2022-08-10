import 'package:equatable/equatable.dart';
import 'package:flutter/foundation.dart' show kDebugMode;
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../models/category.dart';

part 'generator_state.dart';

class GeneratorCubit extends Cubit<GeneratorState> {
  GeneratorCubit() : super(const GeneratorState());

  void setSingleCategory(bool singleCategory) =>
      emit(state.copyWith(singleCategory: singleCategory));

  void setCategory(Category category) => emit(state.copyWith(
        singleCategory: true,
        category: category,
      ));

  void setPracticeQuestionCount(String questions) =>
      emit(state.copyWith(practiceQuestionCount: int.tryParse(questions)));

  void setTestQuestionCount(String questions) =>
      emit(state.copyWith(testQuestionCount: int.tryParse(questions)));

  void setDuration(String minutes) {
    final min = int.tryParse(minutes);
    if (min == null) return;
    emit(state.copyWith(timerDuration: Duration(minutes: min)));
  }
}
