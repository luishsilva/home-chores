import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersonAdd } from 'react-bootstrap-icons';

type DashboardCardType = {
  cardTitle: string;
  children: React.ReactNode;
  hasBtnAction?: boolean;
  viewAllLink?: string | null;
};

const DashboardCard: React.FC<DashboardCardType> = ({
  cardTitle,
  children,
  hasBtnAction = false,
  viewAllLink = null,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border card dashboard-card">
      <div className="align-items-center card-header d-flex fw-bold justify-content-between">
        <div className="card-title">{cardTitle}</div>
        {hasBtnAction && (
          <PersonAdd
            size="20"
            className="cursor-pointer"
            onClick={() => navigate('/add-member')}
          />
        )}
      </div>
      <div className="card-body d-flex flex-column p-3">{children}</div>
      {viewAllLink && (
        <div className="align-self-end pb-2 pe-3">
          <Link to={`${viewAllLink}`}>
            <span className="text-primary">View all</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
