// FormPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import categories from '../data/questionairre';
import Navbar from '../components/Navbar';
// Import the calculation function from your separate file
import { calculateCarbonFootprint } from '../utils/calculateFootprint';

const FormPage = () => {
  const navigate = useNavigate();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedUnit, setSelectedUnit] = useState(null);

  const currentCategory = categories[currentCategoryIndex];
  const currentQuestion = currentCategory.questions[currentQuestionIndex];

  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentCategoryIndex]: {
        ...prev[currentCategoryIndex],
        [currentQuestionIndex]: currentQuestion.unitToggle
          ? { value, unit: selectedUnit }
          : value,
      },
    }));
  };

  const isCurrentQuestionAnswered = () => {
    const catAnswers = answers[currentCategoryIndex] || {};
    return catAnswers[currentQuestionIndex] !== undefined && catAnswers[currentQuestionIndex] !== "";
  };

  const isCurrentCategoryComplete = () => {
    const catAnswers = answers[currentCategoryIndex] || {};
    return currentCategory.questions.every((q, idx) => catAnswers[idx] !== undefined && catAnswers[idx] !== "");
  };

  const handleNext = () => {
    if (!isCurrentQuestionAnswered()) return;

    // Move to the next question if not at the end of this category.
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (isCurrentCategoryComplete() && currentCategoryIndex < categories.length - 1) {
        // Move to next category
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
      } else if (isCurrentCategoryComplete() && currentCategoryIndex === categories.length - 1) {
        // Final question answered; perform the calculation.
        const result = calculateCarbonFootprint(answers);
        // Navigate to the results page and pass the answers/result via route state.
        navigate('/results', { state: { answers, result } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      const prevCategoryIndex = currentCategoryIndex - 1;
      const prevCategory = categories[prevCategoryIndex];
      setCurrentCategoryIndex(prevCategoryIndex);
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  const isCategoryAccessible = (index) => {
    if (index <= currentCategoryIndex) return true;
    return isCurrentCategoryComplete();
  };

  const getCategoryButtonStyle = (index) => {
    if (index < currentCategoryIndex) return "bg-green-800";
    if (index === currentCategoryIndex) return "bg-green-600";
    return "bg-gray-400/30";
  };

  const handleCategoryClick = (index) => {
    if (isCategoryAccessible(index)) {
      setCurrentCategoryIndex(index);
      setCurrentQuestionIndex(0);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "dropdown":
        return (
          <div className='flex flex-col gap-5'>
            <p className="text-xl font-semibold mb-4 active:border-amber-400">
              {currentQuestion.question}
            </p>
            <select
              value={answers[currentCategoryIndex]?.[currentQuestionIndex] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-0 focus:border-gray-600 focus:border-2"
            >
              <option value="" disabled>
                Select an option
              </option>
              {currentQuestion.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "slider":
        return (
          <div className='flex flex-col gap-5'>
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            <input
              type="range"
              min={currentQuestion.range[0]}
              max={currentQuestion.range[1]}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600 custom-slider"
            />
            <p className="text-sm text-gray-600 mt-1">
              Value: {answers[currentCategoryIndex]?.[currentQuestionIndex] || currentQuestion.range[0]}
            </p>
          </div>
        );

      case "numeric": {
        const currentAnswer = answers[currentCategoryIndex]?.[currentQuestionIndex];
        const inputValue =
          currentAnswer && typeof currentAnswer === "object"
            ? currentAnswer.value
            : currentAnswer || "";
        return (
          <div className='flex flex-col gap-5'>
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-0 focus:border-gray-600 focus:border-2"
              placeholder="Enter a number"
            />
            {currentQuestion.unitToggle && (
              <div className="flex gap-2 items-center">
                <label className="text-sm text-gray-600">Units:</label>
                <div className="flex gap-2">
                  {currentQuestion.unitToggle.map((unit, idx) => (
                    <button
                      key={idx}
                      className={`px-2 py-1 rounded border ${
                        selectedUnit === unit
                          ? "bg-green-300 text-gray-500 hover:bg-green-400"
                          : "bg-white text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedUnit(unit)}
                      type="button"
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      case "checkbox":
        return (
          <div className='flex flex-col gap-5'>
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            {currentQuestion.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const prev = answers[currentCategoryIndex]?.[currentQuestionIndex] || [];
                    const updated = e.target.checked
                      ? [...prev, option]
                      : prev.filter((val) => val !== option);
                    handleAnswer(updated);
                  }}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        );

      case "text":
      default:
        return (
          <div className='flex flex-col gap-5'>
            <p className="text-xl font-semibold mb-4">{currentQuestion.question}</p>
            <input
              type="text"
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Type your answer here..."
            />
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${currentCategory.bgColor} flex flex-col gap-12`}>
      <Navbar
        categories={categories}
        currentCategoryIndex={currentCategoryIndex}
        isCurrentCategoryComplete={isCurrentCategoryComplete}
        handleCategoryClick={handleCategoryClick}
        getCategoryButtonStyle={getCategoryButtonStyle}
      />
      <div className="flex-grow flex items-center justify-center p-4 gap-12">
        <div>
          <img src={currentCategory.img} alt={currentCategory.name} className="w-128 h-128 mb-4" />
        </div>
        <div className="w-full max-w-md bg-white/30 p-6 rounded shadow">
          {renderQuestion()}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentCategoryIndex === 0 && currentQuestionIndex === 0}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
              className="bg-green-800 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
              {currentCategoryIndex === categories.length - 1 && currentQuestionIndex === currentCategory.questions.length - 1
                ? "Submit"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

