
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AdminCheckHandler } from '@/components/auth/AdminCheckHandler';
import { checkIfUserIsAdmin } from '@/utils/adminHelper';
import { logSecurityEvent } from '@/utils/auditLogger';

// Mock dependencies
vi.mock('@/utils/adminHelper', () => ({
  checkIfUserIsAdmin: vi.fn()
}));

vi.mock('@/utils/auditLogger', () => ({
  logSecurityEvent: vi.fn().mockResolvedValue('event-123')
}));

// Mock performance.now
const originalPerformanceNow = performance.now;
let mockPerformanceValue = 0;

describe('AdminCheckHandler Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup performance.now mock
    performance.now = vi.fn(() => {
      mockPerformanceValue += 100;
      return mockPerformanceValue;
    });
    
    // Reset navigator userAgent for tests
    Object.defineProperty(navigator, 'userAgent', {
      value: 'test-user-agent',
      configurable: true
    });
    
    // Reset window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/admin-test' },
      configurable: true
    });
  });
  
  afterEach(() => {
    performance.now = originalPerformanceNow;
    mockPerformanceValue = 0;
  });

  it('should verify admin access and log security events', async () => {
    // Arrange
    vi.mocked(checkIfUserIsAdmin).mockResolvedValueOnce(true);
    
    const mockUser = {
      id: 'user-123',
      email: 'admin@example.com'
    };
    
    const childrenFn = vi.fn((isAdmin, done) => (
      <div data-testid="admin-result" data-admin={isAdmin} data-done={done}>
        {isAdmin ? 'Is Admin' : 'Not Admin'}
      </div>
    ));

    // Act
    render(
      <AdminCheckHandler
        user={mockUser}
        roleRequired="admin"
        adminOnly={true}
        hasInitialized={true}
      >
        {childrenFn}
      </AdminCheckHandler>
    );

    // Assert
    await waitFor(() => {
      expect(childrenFn).toHaveBeenCalledWith(true, true);
    });
    
    expect(screen.getByTestId('admin-result')).toHaveTextContent('Is Admin');
    expect(screen.getByTestId('admin-result')).toHaveAttribute('data-admin', 'true');
    expect(screen.getByTestId('admin-result')).toHaveAttribute('data-done', 'true');
    
    expect(checkIfUserIsAdmin).toHaveBeenCalledTimes(1);
    
    // Verify security logging (first call)
    expect(logSecurityEvent).toHaveBeenCalledTimes(2);
    expect(logSecurityEvent).toHaveBeenNthCalledWith(1, expect.objectContaining({
      user: 'admin@example.com',
      action: 'SECURITY_EVENT',
      resource: 'admin_verification',
      details: expect.objectContaining({
        attempt: 1,
        method: 'database_check',
        user_agent: 'test-user-agent',
        route: '/admin-test'
      })
    }));
    
    // Verify result logging (second call)
    expect(logSecurityEvent).toHaveBeenNthCalledWith(2, expect.objectContaining({
      user: 'admin@example.com',
      action: 'SECURITY_EVENT',
      resource: 'admin_verification',
      details: expect.objectContaining({
        result: 'success',
        verification_time_ms: 100,
        total_attempts: 1
      })
    }));
  });

  it('should handle admin verification failure securely', async () => {
    // Arrange
    vi.mocked(checkIfUserIsAdmin).mockResolvedValueOnce(false);
    
    const mockUser = {
      id: 'user-456',
      email: 'user@example.com'
    };
    
    const childrenFn = vi.fn((isAdmin, done) => (
      <div data-testid="admin-result" data-admin={isAdmin} data-done={done}>
        {isAdmin ? 'Is Admin' : 'Not Admin'}
      </div>
    ));

    // Act
    render(
      <AdminCheckHandler
        user={mockUser}
        roleRequired="admin"
        adminOnly={true}
        hasInitialized={true}
      >
        {childrenFn}
      </AdminCheckHandler>
    );

    // Assert
    await waitFor(() => {
      expect(childrenFn).toHaveBeenCalledWith(false, true);
    });
    
    expect(screen.getByTestId('admin-result')).toHaveTextContent('Not Admin');
    expect(screen.getByTestId('admin-result')).toHaveAttribute('data-admin', 'false');
    
    expect(logSecurityEvent).toHaveBeenCalledTimes(2);
    expect(logSecurityEvent).toHaveBeenNthCalledWith(2, expect.objectContaining({
      user: 'user@example.com',
      action: 'SECURITY_EVENT',
      resource: 'admin_verification',
      details: expect.objectContaining({
        result: 'denied'
      }),
      severity: 'high'
    }));
  });

  it('should handle verification errors gracefully', async () => {
    // Arrange
    const testError = new Error('Database connection failed');
    vi.mocked(checkIfUserIsAdmin).mockRejectedValueOnce(testError);
    
    const mockUser = {
      id: 'user-789',
      email: 'error@example.com'
    };
    
    const childrenFn = vi.fn((isAdmin, done) => (
      <div data-testid="admin-result" data-admin={isAdmin} data-done={done}>
        {isAdmin ? 'Is Admin' : 'Not Admin'}
      </div>
    ));

    // Act
    render(
      <AdminCheckHandler
        user={mockUser}
        roleRequired="admin"
        adminOnly={true}
        hasInitialized={true}
      >
        {childrenFn}
      </AdminCheckHandler>
    );

    // Assert
    await waitFor(() => {
      expect(childrenFn).toHaveBeenCalledWith(false, true);
    });
    
    // Should fail secure (deny access on error)
    expect(screen.getByTestId('admin-result')).toHaveTextContent('Not Admin');
    
    expect(logSecurityEvent).toHaveBeenCalledTimes(2);
    expect(logSecurityEvent).toHaveBeenNthCalledWith(2, expect.objectContaining({
      user: 'error@example.com',
      action: 'SECURITY_EVENT',
      resource: 'admin_verification',
      details: expect.objectContaining({
        result: 'error',
        error: 'Database connection failed'
      }),
      severity: 'high'
    }));
  });
});
