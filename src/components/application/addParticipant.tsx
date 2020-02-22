import React from 'react';


type Props = {
  participants: string[];
  addParticipantToChat: (nickname: string) => void;
};

type State = {
  participantNickname: string;
};

export class AddParticipant extends React.Component<Props, State> {

  state = {
    participantNickname: ''
  };

  addParticipant = () => {
    const { participantNickname } = this.state;
    this.props.addParticipantToChat(participantNickname);
    this.setState({ participantNickname: '' });
  };

  setParticipantNickname = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ participantNickname: e.currentTarget.value.trim() });
  };

  handleKeyDownOnNicknameInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) { // 13 is for ENTER
      this.addParticipant();
    }
  };

  render() {
    const { participantNickname } = this.state;
    const { participants } = this.props;
    const nicknameAlreadyTaken = participants.includes(participantNickname);

    return (
      <div>
        Enter nickname to join conversation
        <input
          type="text"
          className="nicknameInput"
          value={ participantNickname }
          onChange={ this.setParticipantNickname }
          onKeyDown={ this.handleKeyDownOnNicknameInput }
        />

        <button disabled={ nicknameAlreadyTaken } onClick={ this.addParticipant } > Add </button>
        { nicknameAlreadyTaken && <div>this nickname is already taken</div>}
      </div>
    );
  }
}