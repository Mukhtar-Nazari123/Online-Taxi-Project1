<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\API\UserAuthController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\DriverController;
use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\DriverLocationController;
use App\Http\Controllers\API\TripController;
use App\Http\Controllers\API\MessageController;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Broadcast;





Route::post('register', [UserAuthController::class, 'register']);

Route::post('login', [UserAuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    // User-specific routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('profile', [UserAuthController::class, 'profile']);
    Route::put('users/{user}', [UserAuthController::class, 'update']);
    Route::post('logout', [UserAuthController::class, 'logout']);

    // Other protected routes
    // ...
});


Route::prefix('admin')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('/users', [AdminController::class, 'allUsers']);
        Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
        Route::put('/drivers/{driver}/status', [DriverController::class, 'updateDriverStatus']);
        Route::get('/drivers', [AdminController::class, 'allDrivers']);
        Route::get('/drivers/{driver}', [DriverController::class, 'show']);
        Route::delete('/drivers/{id}', [AdminController::class, 'deleteDriver']);
        Route::post('/drivers/{driver}', [DriverController::class, 'updateDriverDoc']);
        Route::get('/carsInfo', [AdminController::class, 'carsInfo']);
        Route::delete('/deleteCar/{car}', [AdminController::class, 'deleteCar']);
        Route::get('/tripInfo', [TripController::class, 'showTrips']);
        Route::delete('/delete/{trip}', [TripController::class, 'deleteTrip']);
        Route::get('/messages', [AdminController::class, 'getMessages']);
        Route::delete('/deleteMessage/{message}', [AdminController::class, 'deleteMessage']);
    });


Route::prefix('driver')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/docs', [DriverController::class, 'store']);
        Route::get('/profile/{driver}', [DriverController::class, 'driverInfo']);
        Route::post('/updateProfile/{driver}', [DriverController::class, 'updateDriverInfo']);
        Route::post('/{driverId}/location', [DriverLocationController::class, 'saveLocation']);
    });



Route::prefix('car')
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::post('/info', [CarController::class, 'store']);
        Route::get('/showInfo/{driver_id}', [CarController::class, 'showInfo']);
        Route::put('/update/{car_id}', [CarController::class, 'update']);

    });


Route::prefix('trip')
    ->group(function () {
        Route::post('/tripRequest', [TripController::class, 'createRequest']);
        Route::post('/accepted/{rideId}', [TripController::class, 'driverAccept']);
        Route::post('/message/{tripId}', [MessageController::class, 'storeMessage']);
        Route::post('/start/{tripId}', [TripController::class, 'startTrip']);
        Route::post('/complete/{tripId}', [TripController::class, 'completeTrip']);

    });


Route::post('/notifications', [NotificationController::class, 'sendNotification']);

Route::get('/nominatim', function (Request $request) {
    $query = $request->input('q');

    if (empty($query)) {
        return response()->json(['error' => 'Query parameter is required'], 400);
    }

    $boundingBox = '68.4716,34.1159,69.4942,34.8528';
    $response = Http::get('https://nominatim.openstreetmap.org/search', [
        'q' => $query,
        'format' => 'json',
        'limit' => 10,
        'viewbox' => $boundingBox,
        'bounded' => 1,
    ]);

    if ($response->failed()) {
        return response()->json(['error' => 'API request failed'], 500);
    }

    return response()->json($response->json());
});
