package com.dataguardian.ui.screens.history

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dataguardian.data.models.Connection
import com.dataguardian.data.repository.ConnectionRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import java.util.*
import javax.inject.Inject

@HiltViewModel
class HistoryViewModel @Inject constructor(
    private val connectionRepository: ConnectionRepository
) : ViewModel() {

    private val _selectedDate = MutableStateFlow(Date())
    private val _connections = MutableStateFlow<List<Connection>>(emptyList())
    val connections: StateFlow<List<Connection>> = _connections.asStateFlow()

    init {
        observeConnections()
    }

    fun setSelectedDate(date: Date) {
        _selectedDate.value = date
    }

    private fun observeConnections() {
        _selectedDate
            .flatMapLatest { date ->
                val startOfDay = Calendar.getInstance().apply {
                    time = date
                    set(Calendar.HOUR_OF_DAY, 0)
                    set(Calendar.MINUTE, 0)
                    set(Calendar.SECOND, 0)
                }.time

                val endOfDay = Calendar.getInstance().apply {
                    time = date
                    set(Calendar.HOUR_OF_DAY, 23)
                    set(Calendar.MINUTE, 59)
                    set(Calendar.SECOND, 59)
                }.time

                connectionRepository.getConnectionsByTimeRange(startOfDay, endOfDay)
            }
            .onEach { connections ->
                _connections.value = connections.sortedByDescending { it.timestamp }
            }
            .launchIn(viewModelScope)
    }
} 