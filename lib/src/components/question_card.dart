import 'package:flutter/material.dart';

import '../models/question.dart';

class QuestionCard extends StatelessWidget {
  final Question question;

  const QuestionCard({
    Key? key,
    required this.question,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Container(
        constraints: const BoxConstraints(maxWidth: 800),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${question.id}'.padLeft(3, '0'),
                  style: theme.textTheme.bodySmall,
                ),
                Text(
                  question.question,
                  style: theme.textTheme.titleLarge,
                ),
                const SizedBox(height: 10),
                if (question.image != null)
                  Center(
                    child: Container(
                      constraints: const BoxConstraints(
                        maxHeight: 500,
                        maxWidth: 500,
                      ),
                      padding: const EdgeInsets.only(bottom: 10),
                      child: question.answers != null
                          ? Image.asset('images/${question.image}')
                          : HiddenImage(img: question.image!),
                    ),
                  ),
                if (question.answers != null)
                  Card(
                    clipBehavior: Clip.antiAlias,
                    elevation: 0,
                    shape: (theme.cardTheme.shape as RoundedRectangleBorder?)
                        ?.copyWith(
                      side: BorderSide(color: Colors.grey.shade300),
                    ),
                    child: ListView.separated(
                      shrinkWrap: true,
                      itemCount: question.answers!.length,
                      itemBuilder: (_, index) => AnswerTile(
                        answer: question.answers![index],
                        isCorrect: index == question.correct,
                      ),
                      separatorBuilder: (_, __) => const Divider(height: 0),
                    ),
                  )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class HiddenImage extends StatefulWidget {
  final String img;

  const HiddenImage({
    Key? key,
    required this.img,
  }) : super(key: key);

  @override
  State<HiddenImage> createState() => _HiddenImageState();
}

class _HiddenImageState extends State<HiddenImage> {
  bool _hidden = true;

  @override
  Widget build(BuildContext context) => FramedWidget(
        child: !_hidden
            ? Image.asset('images/${widget.img}')
            : InkWell(
                onTap: () => setState(() {
                  _hidden = false;
                }),
                child: Center(
                  child: Padding(
                    padding: const EdgeInsets.all(30),
                    child: Text(
                      'Razkrij odgovor',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                ),
              ),
      );
}

class FramedWidget extends StatelessWidget {
  final Widget? child;

  const FramedWidget({
    Key? key,
    this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 0,
      shape: (theme.cardTheme.shape as RoundedRectangleBorder?)?.copyWith(
        side: BorderSide(color: theme.colorScheme.primary),
      ),
      clipBehavior: Clip.hardEdge,
      child: child,
    );
  }
}

class AnswerTile extends StatefulWidget {
  final String answer;
  final bool isCorrect;
  final void Function()? onClick;

  const AnswerTile({
    Key? key,
    required this.answer,
    required this.isCorrect,
    this.onClick,
  }) : super(key: key);

  @override
  State<AnswerTile> createState() => _AnswerTileState();
}

class _AnswerTileState extends State<AnswerTile> {
  bool _clicked = false;

  @override
  Widget build(BuildContext context) => ListTile(
        onTap: _clicked
            ? null
            : () {
                widget.onClick?.call();
                setState(() {
                  _clicked = true;
                });
              },
        title: Text(widget.answer),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        tileColor: !_clicked
            ? null
            : widget.isCorrect
                ? Colors.green.shade300
                : Colors.red.shade200,
      );
}
