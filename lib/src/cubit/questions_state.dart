part of 'questions_cubit.dart';

abstract class QuestionsState extends Equatable {
  const QuestionsState();

  @override
  List<Object> get props => [];
}

class QuestionsInitial extends QuestionsState {}

class QuestionsLoaded extends QuestionsState {
  final List<Question> questions;

  const QuestionsLoaded(this.questions);

  @override
  List<Object> get props => questions;
}
