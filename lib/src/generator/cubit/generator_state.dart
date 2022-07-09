part of 'generator_cubit.dart';

abstract class GeneratorState extends Equatable {
  final int questionCount;

  const GeneratorState(this.questionCount);
}

class GeneratorPractice extends GeneratorState {
  final bool singleCategory;
  final Category? category;

  const GeneratorPractice({
    int questionCount = 5,
    required this.singleCategory,
    Category? category,
  })  : category = singleCategory ? category : null,
        super(questionCount);

  GeneratorPractice copyWith({
    int? questionCount,
    bool? singleCategory,
    Category? category,
  }) =>
      GeneratorPractice(
        questionCount: questionCount ?? this.questionCount,
        singleCategory: singleCategory ?? this.singleCategory,
        category: category ?? this.category,
      );

  @override
  List<Object?> get props => [questionCount, singleCategory, category];
}

class GeneratorTest extends GeneratorState {
  final Duration timerDuration;

  const GeneratorTest({
    int questionCount = 60,
    this.timerDuration = const Duration(minutes: 90),
  }) : super(questionCount);

  GeneratorTest copyWith({
    int? questionCount,
    Duration? timerDuration,
  }) =>
      GeneratorTest(
        questionCount: questionCount ?? this.questionCount,
        timerDuration: timerDuration ?? this.timerDuration,
      );

  @override
  List<Object?> get props => [questionCount, timerDuration];
}
