import React, {useEffect} from 'react';
import { JoinedChatsList } from "../components/joined-chats-list";
import { ViewTitle } from "../components/shared/view-title";
import { AvailableChatsList } from "../components/available-chats-list";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";
import { BaseLayout } from "../components/layouts/base-layout";
import { Link } from "react-router-dom";

export const HomeView = () => {
  const joined = useSelector(({ chats }) => chats.joined);
  const available = useSelector(({ chats }) => chats.available);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <BaseLayout hideHomeButton>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChatsList chats={joined} />
        </div>
        <div className="col-9 fh">
          <ViewTitle text="Choose your channel">
            <Link
              className="btn btn-outline-primary"
              to="/create-chat">New</Link>
          </ViewTitle>
          <div className="container-fluid">
            <AvailableChatsList chats={available} />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};
