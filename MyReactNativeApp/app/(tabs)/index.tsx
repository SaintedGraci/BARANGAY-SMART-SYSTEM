import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            router.replace('/login');
          },
        },
      ]
    );
  };

  const services = [
    {
      title: 'Request Documents',
      desc: 'Apply for Municipal Clearance, Indigency, and Residency certificates',
      icon: 'document-text-outline',
      color: '#3B82F6',
    },
    {
      title: 'Incident Reports',
      desc: 'File and track incident reports and community concerns',
      icon: 'shield-checkmark-outline',
      color: '#EF4444',
    },
    {
      title: 'Announcements',
      desc: 'Get real-time updates on community events and alerts',
      icon: 'megaphone-outline',
      color: '#F59E0B',
    },
    {
      title: 'Online Payment',
      desc: 'Pay for document fees and permits securely',
      icon: 'card-outline',
      color: '#8B5CF6',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={['#1E40AF', '#2563EB']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.municipalityText}>Municipality of Alicia</Text>
            <Text style={styles.portalText}>Digital Portal</Text>
          </View>
          
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={24} color="white" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active{'\n'}Requests</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={24} color="white" />
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Completed{'\n'}Documents</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <Text style={styles.sectionSubtitle}>
          Everything you need from your Municipality, simplified and accessible
        </Text>

        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}20` }]}>
                <Ionicons name={service.icon as any} size={24} color={service.color} />
              </View>
              
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDesc}>{service.desc}</Text>
              
              <View style={styles.serviceAction}>
                <Text style={[styles.learnMore, { color: service.color }]}>Learn more</Text>
                <Ionicons name="arrow-forward" size={12} color={service.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <LinearGradient
          colors={['#EFF6FF', '#DBEAFE']}
          style={styles.quickActionsCard}
        >
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF2F2' }]}>
                <Ionicons name="warning-outline" size={20} color="#EF4444" />
              </View>
              <Text style={styles.quickActionText}>Emergency{'\n'}Report</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="document-outline" size={20} color="#3B82F6" />
              </View>
              <Text style={styles.quickActionText}>Document{'\n'}Request</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F0FDF4' }]}>
                <Ionicons name="call-outline" size={20} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Contact{'\n'}Official</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  municipalityText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  portalText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  servicesSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
    marginBottom: 12,
  },
  serviceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  learnMore: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  quickActionsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
});