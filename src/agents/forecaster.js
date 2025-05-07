var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as tf from "@tensorflow/tfjs";
import { logger } from "@/utils/loggingService";
/**
 * Trains a simple forecast model based on historical data
 *
 * @param data Array of numerical data points
 * @returns Trained TensorFlow model
 */
export function trainForecastModel(data) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield model.fit(xs, ys, {
                epochs: 500,
                verbose: 0,
            });
            return model;
        }
        catch (error) {
            logger.error("Error training forecast model:", error);
            throw error;
        }
    });
}
/**
 * Forecasts future values using a trained model
 *
 * @param model Trained TensorFlow model
 * @param nextX The time index to predict
 * @returns Predicted value for the given time index
 */
export function forecastFuture(model, nextX) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const input = tf.tensor2d([[nextX]]);
            const prediction = model.predict(input);
            const forecastedValue = (yield prediction.data())[0];
            return forecastedValue;
        }
        catch (error) {
            logger.error("Error forecasting future value:", error);
            throw error;
        }
    });
}
/**
 * Forecasts resource points for an executive based on past performance
 *
 * @param pastResourcePoints Array of historical resource point values
 * @returns Predicted future resource point value
 */
export function forecastExecutiveResources(pastResourcePoints) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (pastResourcePoints.length < 3) {
                return null; // Not enough data for meaningful prediction
            }
            const model = yield trainForecastModel(pastResourcePoints);
            const nextX = pastResourcePoints.length;
            const forecastedValue = yield forecastFuture(model, nextX);
            return Math.round(forecastedValue);
        }
        catch (error) {
            logger.error("Error forecasting executive resources:", error);
            return null;
        }
    });
}
/**
 * Trains multiple forecast models for different KPI types
 *
 * @param kpiData Record of KPI types to their historical data
 * @returns Record of KPI types to their trained models
 */
export function trainMultiForecastModels(kpiData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const models = {};
            for (const kpiType in kpiData) {
                const data = kpiData[kpiType];
                if (data.length < 3) {
                    logger.warn(`Not enough data points for KPI type ${kpiType}. Skipping model training.`);
                    continue;
                }
                models[kpiType] = yield trainForecastModel(data);
                logger.info(`Trained forecast model for KPI type: ${kpiType}`);
            }
            return models;
        }
        catch (error) {
            logger.error("Error training multiple forecast models:", error);
            throw error;
        }
    });
}
/**
 * Forecasts future values for multiple KPI types
 *
 * @param models Record of KPI types to their trained models
 * @param nextX The time index to predict
 * @returns Record of KPI types to their predicted values
 */
export function forecastMultipleFuture(models, nextX) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const forecasts = {};
            for (const kpiType in models) {
                const model = models[kpiType];
                forecasts[kpiType] = yield forecastFuture(model, nextX);
                logger.info(`Forecasted future value for KPI type ${kpiType}: ${forecasts[kpiType]}`);
            }
            return forecasts;
        }
        catch (error) {
            logger.error("Error forecasting multiple future values:", error);
            throw error;
        }
    });
}
