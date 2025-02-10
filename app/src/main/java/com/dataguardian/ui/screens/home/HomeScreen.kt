package com.dataguardian.ui.screens.home

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.dataguardian.R
import com.dataguardian.ui.navigation.Screen

@Composable
fun HomeScreen(navController: NavController) {
    var isVpnActive by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = stringResource(R.string.welcome_message),
            style = MaterialTheme.typography.headlineMedium
        )

        Text(
            text = stringResource(R.string.app_description),
            style = MaterialTheme.typography.bodyLarge
        )

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = { isVpnActive = !isVpnActive },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                text = if (isVpnActive) 
                    stringResource(R.string.stop_monitoring)
                else 
                    stringResource(R.string.start_monitoring)
            )
        }

        Spacer(modifier = Modifier.height(16.dp))

        NavigationButtons(navController)
    }
}

@Composable
private fun NavigationButtons(navController: NavController) {
    Column(
        modifier = Modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        OutlinedButton(
            onClick = { navController.navigate(Screen.Monitoring.route) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(stringResource(R.string.view_live_traffic))
        }

        OutlinedButton(
            onClick = { navController.navigate(Screen.History.route) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(stringResource(R.string.view_history))
        }

        OutlinedButton(
            onClick = { navController.navigate(Screen.Settings.route) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(stringResource(R.string.settings))
        }
    }
} 