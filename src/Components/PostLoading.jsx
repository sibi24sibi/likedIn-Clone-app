export const LoadingComponent = () => (
    <div className="skeleton-wrapper">
        <div className="skeleton-profile">
            <div className="skeleton-circle" />
            <div className="skeleton-info">
                <div className="skeleton-line skeleton-short" />
                <div className="skeleton-line skeleton-long" />
            </div>
        </div>
        <div className="skeleton-content">
            <div className="skeleton-line skeleton-long" />
            <div className="skeleton-line skeleton-medium" />
            <div className="skeleton-line skeleton-short" />
        </div>
        <div className="skeleton-image" />
        <div className="skeleton-actions">
            <div className="skeleton-button" />
            <div className="skeleton-button" />
        </div>
    </div>
);