part of 'quiz_cubit.dart';

class QuizState extends Equatable {
  final String title;
  final List<Question> questions;
  final int firstCount;
  final int count;
  final Duration? duration;
  final bool revealInstantly;

  final DateTime? startTime;
  final List<int?>? answers;
  final List<Set<int>?>? revealed;

  QuizState({
    required this.title,
    required this.questions,
    int? firstCount,
    required int count,
    this.duration,
    required this.revealInstantly,
    this.startTime,
    this.answers,
    this.revealed,
  })  : firstCount = firstCount ?? min(count, questions.length),
        count = min(count, questions.length);

  QuizState copyWith({
    String? title,
    List<Question>? questions,
    int? count,
    Duration? duration,
    bool? revealInstantly,
    DateTime? startTime,
    List<int?>? answers,
    List<Set<int>?>? revealed,
  }) =>
      QuizState(
        title: title ?? this.title,
        questions: questions ?? this.questions,
        count: count ?? this.count,
        duration: duration ?? this.duration,
        revealInstantly: revealInstantly ?? this.revealInstantly,
        startTime: startTime ?? this.startTime,
        answers: answers ?? this.answers,
        revealed: revealed ?? this.revealed,
        firstCount: firstCount,
      );

  @override
  List<Object?> get props => [
        title,
        questions,
        firstCount,
        count,
        duration,
        revealInstantly,
        startTime,
        answers,
        revealed,
      ];
}
