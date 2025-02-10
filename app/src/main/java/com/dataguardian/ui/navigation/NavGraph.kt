package com.dataguardian.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.dataguardian.ui.screens.home.HomeScreen
import com.dataguardian.ui.screens.monitoring.MonitoringScreen
import com.dataguardian.ui.screens.history.HistoryScreen
import com.dataguardian.ui.screens.settings.SettingsScreen

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Monitoring : Screen("monitoring")
    object History : Screen("history")
    object Settings : Screen("settings")
}

@Composable
fun NavGraph() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = Screen.Home.route) {
        composable(Screen.Home.route) {
            HomeScreen(navController)
        }
        composable(Screen.Monitoring.route) {
            MonitoringScreen(navController)
        }
        composable(Screen.History.route) {
            HistoryScreen(navController)
        }
        composable(Screen.Settings.route) {
            SettingsScreen(navController)
        }
    }
} 