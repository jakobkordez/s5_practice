import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../components/sized_card.dart';
import 'cubit/quiz_cubit.dart';

class QuestionCard extends StatelessWidget {
  final int qIndex;
  final bool forResultScreen;

  const QuestionCard({
    Key? key,
    required this.qIndex,
    this.forResultScreen = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocBuilder<QuizCubit, QuizState>(
        buildWhen: (previous, current) =>
            previous.questions[qIndex] != current.questions[qIndex] ||
            previous.answers?[qIndex] != current.answers?[qIndex] ||
            previous.revealed?[qIndex] != current.revealed?[qIndex],
        builder: (context, state) {
          final theme = Theme.of(context);
          final question = state.questions[qIndex];

          final child = Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${question.id}'.padLeft(3, '0'),
                style: theme.textTheme.bodySmall,
              ),
              Text(
                '${qIndex + 1}. ${question.question}',
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
                        : HiddenImage(
                            img: question.image!,
                            isHidden: state.revealed![qIndex] == null,
                            onClick: () =>
                                context.read<QuizCubit>().answer(qIndex, 1),
                          ),
                  ),
                ),
              if (question.answers != null)
                Material(
                  color: Colors.white,
                  clipBehavior: Clip.antiAlias,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                    side: BorderSide(color: Colors.grey.shade300),
                  ),
                  child: ListView.separated(
                    shrinkWrap: true,
                    itemCount: question.answers!.length,
                    itemBuilder: (_, aIndex) {
                      if (state.revealInstantly) {
                        final revealed = state.revealed![qIndex] ?? {};

                        return AnswerTile(
                          text: question.answers![aIndex],
                          isCorrect: aIndex == question.correct,
                          isRevealed: revealed.contains(aIndex),
                          isEnabled: !revealed.contains(question.correct),
                          onClick: () =>
                              context.read<QuizCubit>().answer(qIndex, aIndex),
                        );
                      }

                      if (forResultScreen) {
                        return AnswerTile(
                          text: question.answers![aIndex],
                          isCorrect: aIndex == question.correct,
                          isRevealed: true,
                          isEnabled: false,
                          isSelected: state.answers![qIndex] == aIndex,
                        );
                      }

                      return AnswerTile(
                        text: question.answers![aIndex],
                        isCorrect: aIndex == question.correct,
                        isRevealed: false,
                        isEnabled: true,
                        isSelected: state.answers![qIndex] == aIndex,
                        onClick: () =>
                            context.read<QuizCubit>().answer(qIndex, aIndex),
                      );
                    },
                    separatorBuilder: (_, __) => const Divider(height: 0),
                  ),
                )
            ],
          );

          if (forResultScreen) return child;

          return SizedCard(child: child);
        },
      );
}

class HiddenImage extends StatelessWidget {
  final String img;
  final bool isHidden;
  final void Function()? onClick;

  const HiddenImage({
    Key? key,
    required this.img,
    this.isHidden = true,
    this.onClick,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return FramedWidget(
      child: Stack(
        children: [
          Image.asset('images/$img'),
          if (isHidden)
            Positioned.fill(
              child: Material(
                color: Color.alphaBlend(
                  theme.colorScheme.primary.withAlpha(20),
                  theme.colorScheme.surface,
                ),
                child: InkWell(
                  onTap: onClick,
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(30),
                      child: Text(
                        'Razkrij odgovor',
                        style: theme.textTheme.titleMedium,
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
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

    return Material(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(color: theme.colorScheme.primary),
      ),
      clipBehavior: Clip.antiAlias,
      child: child,
    );
  }
}

class AnswerTile extends StatelessWidget {
  final String text;
  final bool isCorrect;
  final void Function()? onClick;
  final bool isRevealed;
  final bool isEnabled;
  final bool? isSelected;

  const AnswerTile({
    Key? key,
    required this.text,
    required this.isCorrect,
    this.onClick,
    this.isRevealed = false,
    this.isEnabled = true,
    this.isSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final tileColor = isRevealed
        ? (isCorrect ? Colors.green.shade50 : Colors.red.shade50)
        : null;
    final textColor = isRevealed
        ? (isCorrect ? Colors.green.shade900 : Colors.red.shade900)
        : null;

    return ListTile(
      leading: _icon(),
      onTap: !isRevealed && isEnabled ? onClick : null,
      title: Text(text),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
      iconColor: isRevealed
          ? (isCorrect ? Colors.green.shade900 : Colors.red.shade900)
          : null,
      tileColor: tileColor,
      textColor: textColor,
      selectedTileColor: tileColor,
      selectedColor: textColor,
      selected: isSelected == true,
    );
  }

  Icon? _icon() {
    if (isSelected == true) return const Icon(Icons.radio_button_checked);
    if (isSelected == false) return const Icon(Icons.radio_button_off);

    if (!isRevealed) return const Icon(Icons.question_mark);
    if (isCorrect) return const Icon(Icons.check);
    return const Icon(Icons.clear);
  }
}
