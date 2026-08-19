import React, { Component } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
//import DangerousIcon from '@mui/icons-material/Dangerous';
import LoadingDivisory from '../LoadingDivisory';
import FeedbackToast from '../FeedbackToast';

class FeedbackClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operationCurrent: false,
      operationPerformed: 0,
      feedbackToastLoading: false,
      feedbackToastText: '',
      feedbackToastVisibility: false
    };
    this.onOperationCurrent = this.onOperationCurrent.bind(this);
    this.onOperationInstant = this.onOperationInstant.bind(this);
    this.onOperationPerformed = this.onOperationPerformed.bind(this);
    this.operationInstantCallback = this.operationInstantCallback.bind(this);
    this.userMessage = this.userMessage.bind(this);
    this.loadingMessage = this.loadingMessage.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.endLoading = this.endLoading.bind(this);
  }

  onOperationCurrent(operation) {
    this.setState({ operationCurrent: operation });
  }

  onOperationInstant(operation) {
    this.setState(
      { operationCurrent: operation },
      this.operationInstantCallback
    );
  }

  onOperationPerformed() {
    this.setState((prevState) => ({
      operationPerformed: prevState.operationPerformed + 1
    }));
  }

  operationInstantCallback() {
    this.onOperationPerformed();
  }

  userMessage(message) {
    this.setState({
      feedbackToastLoading: false,
      feedbackToastText: message,
      feedbackToastVisibility: true
    });

    setTimeout(() => {
      this.setState({
        feedbackToastVisibility: false,
        feedbackToastText: '',
        operationPerformed: 0,
        operationCurrent: false
      });
    }, 2900);
  }

  loadingMessage(message = '') {
    this.setState({
      feedbackToastText: message,
      feedbackToastVisibility: true,
      feedbackToastLoading: true
    });

    setTimeout(() => {
      this.setState({
        feedbackToastVisibility: false,
        feedbackToastLoading: false,
        feedbackToastText: '',
        operationPerformed: 0,
        operationCurrent: false
      });
    }, 2900);
  }

  startLoading(message = '') {
    this.setState({
      feedbackToastText: message,
      feedbackToastVisibility: true,
      feedbackToastLoading: true
    });
  }

  endLoading() {
    this.setState({
      feedbackToastVisibility: false,
      feedbackToastLoading: false,
      feedbackToastText: '',
      operationPerformed: 0,
      operationCurrent: false
    });
  }

  componentDidUpdate(_, prevState) {
    const { operationCurrent, operationPerformed } = this.state;

    if (prevState.operationPerformed !== operationPerformed) {
      if (operationCurrent === 'loading-operation') {
        this.loadingMessage();
      } else if (operationPerformed) {
        switch (operationCurrent) {
          case 'create-tag':
          case 'delete-tag':
          case 'create-notification':
          case 'edit-notification':
          case 'delete-notification':
          case 'create-workflow':
          case 'delete-workflow':
            this.userMessage('Operação concluída');
            break;
          case 'unable-delete-workflow':
            this.userMessage('Exclusão não permitida');
            break;
          case 'unable-create-workflow':
            this.userMessage(
              'Os dados passados na criação da ramificação não são permitidos'
            );
            break;
          default:
            break;
        }
      }
    }
  }

  feedbackToastIcon() {
    const { operationCurrent } = this.state;

    switch (operationCurrent) {
      case 'loading-operation':
        return <LoadingDivisory color={'standard'} />;
      case 'manifestacao':
      case 'unable-delete-workflow':
      case 'unable-create-workflow':
        return <BlockIcon sx={{ fontSize: '34px', color: '#A646DC' }} />;
      default:
        return (
          <CheckCircleOutlineIcon sx={{ fontSize: '34px', color: '#A646DC' }} />
        );
    }
  }

  render() {
    const { feedbackToastVisibility, feedbackToastLoading, feedbackToastText } =
      this.state;

    return (
      <FeedbackToast
        visibility={feedbackToastVisibility}
        loading={feedbackToastLoading}
      >
        {this.feedbackToastIcon()}
        {feedbackToastText}
      </FeedbackToast>
    );
  }
}

export default FeedbackClass;
