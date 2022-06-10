import 'package:equatable/equatable.dart';

class Question extends Equatable {
  final int id;
  final String question;
  final String? image;
  final List<String>? answers;
  final int? correct;

  const Question({
    required this.id,
    required this.question,
    required this.image,
    required this.answers,
    required this.correct,
  });

  factory Question.fromJson(Map<String, dynamic> json) => Question(
        id: json['id'],
        question: json['question'],
        image: json['image'],
        answers: (json['answers'] as List?)?.cast(),
        correct: json['correct'],
      );

  @override
  List<Object?> get props => [id, question, image, answers, correct];
}
