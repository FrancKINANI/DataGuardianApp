package com.dataguardian.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.dataguardian.R
import com.dataguardian.data.models.Connection
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun ConnectionsList(
    connections: List<Connection>,
    onConnectionClick: ((Connection) -> Unit)? = null
) {
    if (connections.isEmpty()) {
        EmptyState()
    } else {
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(connections) { connection ->
                ConnectionCard(
                    connection = connection,
                    onClick = { onConnectionClick?.invoke(connection) }
                )
            }
        }
    }
}

@Composable
private fun ConnectionCard(
    connection: Connection,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Text(
                text = connection.destinationDomain ?: connection.destinationIp,
                style = MaterialTheme.typography.titleMedium
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = stringResource(
                    R.string.protocol_port,
                    connection.protocol,
                    connection.port
                ),
                style = MaterialTheme.typography.bodyMedium
            )
            Spacer(modifier = Modifier.height(4.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = formatDateTime(connection.timestamp),
                    style = MaterialTheme.typography.bodySmall
                )
                Text(
                    text = formatTraffic(connection.bytesSent, connection.bytesReceived),
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

@Composable
private fun EmptyState() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = stringResource(R.string.no_connections),
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

private fun formatDateTime(date: Date): String {
    return SimpleDateFormat("HH:mm:ss", Locale.getDefault()).format(date)
}

private fun formatTraffic(sent: Long, received: Long): String {
    return "↑ ${formatBytes(sent)} ↓ ${formatBytes(received)}"
}

private fun formatBytes(bytes: Long): String {
    return when {
        bytes < 1024 -> "$bytes B"
        bytes < 1024 * 1024 -> "${bytes / 1024} KB"
        else -> "${bytes / (1024 * 1024)} MB"
    }
} 