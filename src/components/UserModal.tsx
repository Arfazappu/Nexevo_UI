import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import CountryTag from './CountryTag';
import Button from './Button';
import SelectField from './SelectFIeld';

interface User {
  id: string;
  userName: string;
  userCode: string;
  countries: string[];
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'view';
  user?: User;
  onSave: (user: User) => void;
  onAdd?: () => void;
  onEdit?: (userId: string) => void;
}

const countryOptions = [
  'Argentina', 'Belgium', 'Denmark', 'Egypt', 'Finland', 'Germany', 
  'Iceland', 'Italy', 'Japan', 'Norway', 'Spain', 'Sweden', 'India'
];

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, mode, user, onSave, onAdd, onEdit }) => {
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    userName?: string;
    countries?: string;
  }>({});

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setUserCode(user.userCode);
      setCountries(user.countries);
    } else {
      setUserName('');
      setUserCode('');
      setCountries([]);
    }
    // Reset errors when modal opens
    setErrors({});
  }, [user, isOpen]);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!userName.trim()) {
      newErrors.userName = 'User Name is required';
    }
    
    if (countries.length === 0) {
      newErrors.countries = 'Please select at least one country';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    
    const userData: User = {
      id: user?.id || Date.now().toString(),
      userName: userName.trim(),
      userCode: userCode.trim(),
      countries
    };
    onSave(userData);
    onClose();
  };

  const handleAddNew = () => {
    onClose();
    if (onAdd) {
      onAdd();
    }
  };

  const handleEditUser = () => {
    if (user?.id && onEdit) {
      onEdit(user.id);
    }
  };

  if (!isOpen) return null;

  const isViewMode = mode === 'view';
  const title = mode === 'add' ? 'New User' : mode === 'edit' ? 'Edit User' : 'View Details';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-start justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 mt-20">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E9EB]">
            <h2 className="text-lg font-semibold text-[#15191E]">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#566676]"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-6">
            {isViewMode ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#15191E] mb-4">User Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#566676] mb-1">User Name</p>
                      <p className="text-sm font-medium text-[#15191E]">{userName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#566676] mb-1">User Code</p>
                      <p className="text-sm font-medium text-[#15191E]">{userCode || '-'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#566676] mb-2">Countries</p>
                    <div className="flex flex-wrap gap-2">
                      {countries.map((country, idx) => (
                        <CountryTag country={country} key={idx}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <InputField
                  label="User Name"
                  placeholder="Enter a User Name"
                  value={userName}
                  onChange={setUserName}
                  error={errors.userName}
                />
                <InputField
                  label="Set Code"
                  placeholder="Short code for reference (e.g., NA, EU)"
                  value={userCode}
                  onChange={setUserCode}
                  optional
                />
                <SelectField
                  label="Select Countries"
                  placeholder="Assign one or more countries to include in this user."
                  value={countries}
                  onChange={setCountries}
                  options={countryOptions}
                  error={errors.countries}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5E9EB]">
            {isViewMode ? (
              <>
                <Button
                  onClick={handleAddNew}
                  text='Add New User'
                  variant='tertiary'
                />
                <div className="flex gap-2">
                  <Button
                    onClick={onClose}
                    text='Cancel'
                    variant='secondary'
                  />
                  <Button 
                    onClick={handleEditUser}
                    text='Edit'
                  />
                </div>
              </>
            ) : (
              <div className="flex gap-2 ml-auto">
                <Button
                  onClick={onClose}
                  text='Cancel'
                  variant='secondary'
                />
                <Button
                  text='Save'
                  onClick={handleSave}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;