import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../models/category.dart';

part 'generator_state.dart';

class GeneratorCubit extends Cubit<GeneratorState> {
  GeneratorCubit() : super(const GeneratorPractice(singleCategory: false));

  void setPractice() => emit(const GeneratorPractice(singleCategory: false));

  void setTest() => emit(const GeneratorTest());

  void setSingleCategory(bool singleCategory) => emit(
      (state as GeneratorPractice).copyWith(singleCategory: singleCategory));

  void setCategory(Category category) =>
      emit((state as GeneratorPractice).copyWith(
        singleCategory: true,
        category: category,
      ));

  void setQuestionCount(String questions) {
    final qc = int.tryParse(questions);
    if (qc == null) return;
    emit(state is GeneratorPractice
        ? (state as GeneratorPractice).copyWith(questionCount: qc)
        : (state as GeneratorTest).copyWith(questionCount: qc));
  }

  void setDuration(String minutes) {
    final min = int.tryParse(minutes);
    if (min == null) return;
    emit((state as GeneratorTest)
        .copyWith(timerDuration: Duration(minutes: min)));
  }
}
