
import * as tf from "@tensorflow/tfjs";
import { logger } from '@/utils/loggingService';

/**
 * Trains a simple forecast model based on historical data
 * 
 * @param data Array of numerical data points
 * @returns Trained TensorFlow model
 */
export async function trainForecastModel(data: number[]) {
  try {
    // Create tensors for input (time indices) and output (actual values)
    const xs = tf.tensor1d(data.map((_, i) => i)); // Time indices
    const ys = tf.tensor1d(data); // Actual KPI values

    // Create a sequential model with several dense layers
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 8, activation: "relu", inputShape: [1] }));
    model.add(tf.layers.dense({ units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1 }));

    // Compile the model with appropriate optimizer and loss function
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });

    // Train the model
    await model.fit(xs, ys, {
      epochs: 500,
      verbose: 0,
    });

    return model;
  } catch (error) {
    logger.error('Error training forecast model:', error);
    throw error;
  }
}

/**
 * Forecasts future values using a trained model
 * 
 * @param model Trained TensorFlow model
 * @param nextX The time index to predict
 * @returns Predicted value for the given time index
 */
export async function forecastFuture(model: tf.Sequential, nextX: number): Promise<number> {
  try {
    const input = tf.tensor2d([[nextX]]);
    const prediction = model.predict(input) as tf.Tensor;
    const forecastedValue = (await prediction.data())[0];
    return forecastedValue;
  } catch (error) {
    logger.error('Error forecasting future value:', error);
    throw error;
  }
}

/**
 * Forecasts resource points for an executive based on past performance
 * 
 * @param pastResourcePoints Array of historical resource point values
 * @returns Predicted future resource point value
 */
export async function forecastExecutiveResources(pastResourcePoints: number[]): Promise<number | null> {
  try {
    if (pastResourcePoints.length < 3) {
      return null; // Not enough data for meaningful prediction
    }

    const model = await trainForecastModel(pastResourcePoints);
    const nextX = pastResourcePoints.length;
    const forecastedValue = await forecastFuture(model, nextX);
    
    return Math.round(forecastedValue);
  } catch (error) {
    logger.error('Error forecasting executive resources:', error);
    return null;
  }
}
