import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../models/category.dart';

part 'generator_state.dart';

class GeneratorCubit extends Cubit<GeneratorState> {
  GeneratorCubit() : super(const GeneratorPractice(singleCategory: false));

  void setSingleCategory(bool singleCategory) => emit(
      (state as GeneratorPractice).copyWith(singleCategory: singleCategory));

  void setCategory(Category category) =>
      emit((state as GeneratorPractice).copyWith(
        singleCategory: true,
        category: category,
      ));

  void setQuestionCount(int questionCount) => emit(state is GeneratorPractice
      ? (state as GeneratorPractice).copyWith(questionCount: questionCount)
      : (state as GeneratorTest).copyWith(questionCount: questionCount));
}
