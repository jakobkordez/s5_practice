part of 'questions_cubit.dart';

abstract class QuestionsState extends Equatable {
  const QuestionsState();

  @override
  List<Object> get props => [];
}

class QuestionsInitial extends QuestionsState {}

class QuestionsLoaded extends QuestionsState {
  final List<Category> categories;
  final List<Question> questions;

  const QuestionsLoaded(this.categories, this.questions);

  @override
  List<Object> get props => [categories, questions];

  List<Question> getRandom([
    int? categoryId,
    bool skipDraw = false,
  ]) {
    final cat = categoryId == null
        ? null
        : categories.firstWhere((e) => e.id == categoryId);
    var q = cat == null
        ? questions.toList()
        : [
            for (final range in cat.questions)
              for (int i = range.first - 1; i < range.last; i++) questions[i],
          ];
    if (skipDraw) q = q.where((e) => e.answers != null).toList();
    return q..shuffle();
  }
}
