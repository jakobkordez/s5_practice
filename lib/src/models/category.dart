import 'package:equatable/equatable.dart';

class Category extends Equatable {
  final int id;
  final String title;
  final List<List<int>> questions;

  const Category({
    required this.id,
    required this.title,
    required this.questions,
  });

  factory Category.fromJson(Map<String, dynamic> json) => Category(
        id: json['id'],
        title: json['title'],
        questions: (json['questions'] as List)
            .map((e) => (e as List).cast<int>())
            .toList(),
      );

  @override
  List<Object?> get props => [id, title, questions];
}
