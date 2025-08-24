import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function seedAnalyticsData() {
  try {
    console.log('Seeding analytics data...');

    // Sample assignments
    const assignments = [
      {
        title: 'Math Quiz 1',
        description: 'Basic algebra problems',
        dueDate: new Date('2024-01-15'),
        createdAt: new Date('2024-01-01'),
        status: 'active',
        totalPoints: 100,
        classroomId: 'classroom1'
      },
      {
        title: 'Science Project',
        description: 'Research on renewable energy',
        dueDate: new Date('2024-01-20'),
        createdAt: new Date('2024-01-05'),
        status: 'active',
        totalPoints: 150,
        classroomId: 'classroom1'
      },
      {
        title: 'History Essay',
        description: 'World War 2 analysis',
        dueDate: new Date('2024-01-25'),
        createdAt: new Date('2024-01-10'),
        status: 'active',
        totalPoints: 120,
        classroomId: 'classroom2'
      }
    ];

    // Sample enrollments (students)
    const enrollments = [
      {
        studentId: 'student1',
        classroomId: 'classroom1',
        enrolledAt: new Date('2023-12-01'),
        status: 'active',
        studentName: 'Alice Johnson'
      },
      {
        studentId: 'student2',
        classroomId: 'classroom1',
        enrolledAt: new Date('2023-12-01'),
        status: 'active',
        studentName: 'Bob Smith'
      },
      {
        studentId: 'student3',
        classroomId: 'classroom2',
        enrolledAt: new Date('2023-12-05'),
        status: 'active',
        studentName: 'Carol Davis'
      },
      {
        studentId: 'student4',
        classroomId: 'classroom2',
        enrolledAt: new Date('2023-12-10'),
        status: 'active',
        studentName: 'David Wilson'
      },
      {
        studentId: 'student5',
        classroomId: 'classroom1',
        enrolledAt: new Date('2023-12-15'),
        status: 'active',
        studentName: 'Eva Brown'
      }
    ];

    // Sample submissions
    const submissions = [
      {
        assignmentId: 'assignment1',
        studentId: 'student1',
        submittedAt: new Date('2024-01-12'),
        grade: 85,
        status: 'graded',
        content: 'Math quiz submission'
      },
      {
        assignmentId: 'assignment1',
        studentId: 'student2',
        submittedAt: new Date('2024-01-13'),
        grade: 92,
        status: 'graded',
        content: 'Math quiz submission'
      },
      {
        assignmentId: 'assignment2',
        studentId: 'student1',
        submittedAt: new Date('2024-01-18'),
        grade: 78,
        status: 'graded',
        content: 'Science project submission'
      },
      {
        assignmentId: 'assignment2',
        studentId: 'student3',
        submittedAt: new Date('2024-01-19'),
        grade: 88,
        status: 'graded',
        content: 'Science project submission'
      },
      {
        assignmentId: 'assignment3',
        studentId: 'student4',
        submittedAt: new Date('2024-01-22'),
        grade: 95,
        status: 'graded',
        content: 'History essay submission'
      }
    ];

    // Add assignments
    for (const assignment of assignments) {
      await addDoc(collection(db, 'assignments'), assignment);
    }

    // Add enrollments
    for (const enrollment of enrollments) {
      await addDoc(collection(db, 'enrollments'), enrollment);
    }

    // Add submissions
    for (const submission of submissions) {
      await addDoc(collection(db, 'submissions'), submission);
    }

    console.log('Sample data seeded successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding data:', error);
    return false;
  }
}

export async function clearAnalyticsData() {
  // This would require admin SDK or batch operations
  // For now, just log the intent
  console.log('Clear data function - would need admin SDK implementation');
}
