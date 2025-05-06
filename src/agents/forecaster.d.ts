import * as tf from "@tensorflow/tfjs";
/**
 * Trains a simple forecast model based on historical data
 *
 * @param data Array of numerical data points
 * @returns Trained TensorFlow model
 */
export declare function trainForecastModel(
  data: number[],
): Promise<tf.Sequential>;
/**
 * Forecasts future values using a trained model
 *
 * @param model Trained TensorFlow model
 * @param nextX The time index to predict
 * @returns Predicted value for the given time index
 */
export declare function forecastFuture(
  model: tf.Sequential,
  nextX: number,
): Promise<number>;
/**
 * Forecasts resource points for an executive based on past performance
 *
 * @param pastResourcePoints Array of historical resource point values
 * @returns Predicted future resource point value
 */
export declare function forecastExecutiveResources(
  pastResourcePoints: number[],
): Promise<number | null>;
/**
 * Trains multiple forecast models for different KPI types
 *
 * @param kpiData Record of KPI types to their historical data
 * @returns Record of KPI types to their trained models
 */
export declare function trainMultiForecastModels(
  kpiData: Record<string, number[]>,
): Promise<Record<string, tf.Sequential>>;
/**
 * Forecasts future values for multiple KPI types
 *
 * @param models Record of KPI types to their trained models
 * @param nextX The time index to predict
 * @returns Record of KPI types to their predicted values
 */
export declare function forecastMultipleFuture(
  models: Record<string, tf.Sequential>,
  nextX: number,
): Promise<Record<string, number>>;
