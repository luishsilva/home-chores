import React from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersonAdd } from 'react-bootstrap-icons';

type DashboardCardType = {
  cardTitle: string;
  children: React.ReactNode;
  hasBtnAction?: boolean;
};

const DashboardCard: React.FC<DashboardCardType> = ({
  cardTitle,
  children,
  hasBtnAction = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border card dashboard-card">
      <div className="align-items-center card-header d-flex fw-bold justify-content-between">
        {cardTitle}
        {hasBtnAction && (
          <PersonAdd
            size="20"
            className="cursor-pointer"
            onClick={() => navigate('/add-member')}
          />
        )}
      </div>
      <div className="d-flex flex-column p-3">{children}</div>
    </div>
  );
};

export default DashboardCard;
