part of 'generator_cubit.dart';

abstract class GeneratorState extends Equatable {
  const GeneratorState();

  @override
  List<Object?> get props => [];
}

class GeneratorPractice extends GeneratorState {
  final bool singleCategory;
  final Category? category;

  const GeneratorPractice.single({this.category}) : singleCategory = true;

  const GeneratorPractice.all()
      : singleCategory = false,
        category = null;

  @override
  List<Object?> get props => [singleCategory, category];
}

class GeneratorTest extends GeneratorState {
  final Duration? timerDuration;

  const GeneratorTest({this.timerDuration});

  @override
  List<Object?> get props => [timerDuration];
}
