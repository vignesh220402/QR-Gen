import ProgressBar from 'react-bootstrap/ProgressBar';

function NavigationBar() {
  const now = 60;
  return <ProgressBar now={now} label={`${now}%`} />;
}

export default NavigationBar;