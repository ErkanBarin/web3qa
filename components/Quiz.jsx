'use client';

import { useState } from 'react';

export default function Quiz({ questions }) {
  // Track state for each question: { isAnswered: boolean, selectedIndex: number | null }
  const [questionStates, setQuestionStates] = useState(
    questions.map(() => ({ isAnswered: false, selectedIndex: null }))
  );

  const handleAnswerClick = (questionIndex, answerIndex) => {
    // Only allow selection if question hasn't been answered yet
    if (questionStates[questionIndex].isAnswered) return;

    // Update state to mark question as answered
    setQuestionStates((prev) =>
      prev.map((state, idx) =>
        idx === questionIndex
          ? { isAnswered: true, selectedIndex: answerIndex }
          : state
      )
    );
  };

  return (
    <div className="space-y-8">
      {questions.map((question, questionIndex) => {
        const state = questionStates[questionIndex];
        const isCorrect = state.selectedIndex === question.correctAnswer;

        return (
          <div
            key={questionIndex}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6"
          >
            {/* Question text */}
            <h3 className="text-lg font-semibold text-gray-100 mb-4">
              {questionIndex + 1}. {question.question}
            </h3>

            {/* Answer options */}
            <div className="space-y-3">
              {question.answers.map((answer, answerIndex) => {
                const isSelected = state.selectedIndex === answerIndex;
                const isCorrectAnswer = answerIndex === question.correctAnswer;
                const showFeedback = state.isAnswered;

                // Determine button styling based on state
                let buttonClasses = 'w-full text-left px-4 py-3 rounded-md transition-colors border ';
                
                if (!showFeedback) {
                  // Before answer selected - normal interactive state
                  buttonClasses += 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none';
                } else if (isSelected) {
                  // Selected answer - show correct/incorrect
                  if (isCorrect) {
                    buttonClasses += 'bg-green-900/50 border-green-600 text-green-100 font-semibold';
                  } else {
                    buttonClasses += 'bg-red-900/50 border-red-600 text-red-100 font-semibold';
                  }
                } else if (isCorrectAnswer) {
                  // Reveal correct answer if user selected wrong
                  buttonClasses += 'bg-green-900/30 border-green-700 text-green-200';
                } else {
                  // Other unselected answers after submission
                  buttonClasses += 'bg-gray-800 border-gray-700 text-gray-400';
                }

                return (
                  <button
                    key={answerIndex}
                    onClick={() => handleAnswerClick(questionIndex, answerIndex)}
                    disabled={state.isAnswered}
                    className={buttonClasses}
                    aria-pressed={isSelected}
                    aria-disabled={state.isAnswered}
                  >
                    <span className="flex items-center justify-between">
                      <span>{answer}</span>
                      {showFeedback && isSelected && (
                        <span className="ml-2 text-sm">
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </span>
                      )}
                      {showFeedback && !isSelected && isCorrectAnswer && (
                        <span className="ml-2 text-sm text-green-300">
                          ✓ Correct answer
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {state.isAnswered && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  isCorrect
                    ? 'bg-green-900/30 text-green-200 border border-green-700'
                    : 'bg-red-900/30 text-red-200 border border-red-700'
                }`}
                role="status"
                aria-live="polite"
              >
                {isCorrect ? (
                  <p className="text-sm font-medium">
                    🎉 That's right! Great job.
                  </p>
                ) : (
                  <p className="text-sm font-medium">
                    Not quite. The correct answer is highlighted above.
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
