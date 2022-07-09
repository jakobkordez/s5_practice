import 'package:flutter/material.dart';

class SizedCard extends StatelessWidget {
  final Widget? child;

  const SizedCard({Key? key, this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) => Center(
        child: Container(
          width: double.infinity,
          constraints: const BoxConstraints(maxWidth: 800),
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: child,
            ),
          ),
        ),
      );
}
