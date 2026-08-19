import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ROLES = [
  { value: 'learner', label: 'Learner' },
  { value: 'contributor', label: 'Contributor' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;