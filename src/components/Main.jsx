import { StyleSheet } from 'react-native';
import RepositoryList from './RepositoryList';
import RepositoryPage from './RepositoryPage';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/:repoId" element={<RepositoryPage />} />
          <Route path="/reviewform" element={<ReviewForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;