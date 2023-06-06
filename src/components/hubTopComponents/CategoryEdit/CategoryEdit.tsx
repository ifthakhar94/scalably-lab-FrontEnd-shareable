import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './../../../redux/app/store';
import { setCategories } from '@/redux/features/CategoryInputSlice/categoryInputSlice';
import modalCommonStyles from './../hubTopModal.module.css';
import client from '@/GraphqlClient/client';
import { gql } from 'apollo-boost';
import { hubCategories } from '@/queries/queries';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const KeyCodes = {
  comma: 188,
  enter: 13
};
export interface Tag {
  id: string;
  text: string;
}
export interface CatTypes {
  name: string;
  id: string;
  text: string;
}

const delimiters = [KeyCodes.comma, KeyCodes.enter];
interface dataPropsTypes {
  existingData: Tag[];
}
export const fetched_suggestions: string[] = [];
const CategoryEdit = ({ existingData }: dataPropsTypes) => {
  // console.log(existingData);
  const [tags, setTags] = React.useState<Tag[]>([]);
  const [hubCategoryList, setHubCategoryList] = React.useState<CatTypes[] | undefined>([]);

  const suggestions = fetched_suggestions.map((sigle_suggestion) => {
    return {
      id: sigle_suggestion,
      text: sigle_suggestion
    };
  });

  useEffect(() => {
    hubCategoryList?.map((category: CatTypes) => fetched_suggestions.push(category?.name));
  }, [hubCategoryList]);

  useEffect(() => {
    return setTags(existingData);
  }, []);

  const handleDelete = (i: any) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: any) => {
    // console.log('The tag at index ' + index + ' was clicked');
  };

  const dispatch = useAppDispatch();

  dispatch(setCategories(tags));

  function handleInputChange(value: string): void {
    const getData = setTimeout(() => {
      const UserToken = window.localStorage.getItem('UserToken');

      client
        .query({
          query: hubCategories,
          variables: {
            searchWord: value
          },
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result) => {
          setHubCategoryList(result.data.hubCategories.hubCategoryList);
        })
        .catch((error) => {
          // console.log(error);
        });
    }, 300);
  }

  return (
    <>
      <div className={modalCommonStyles.tag_input_content}>
        <div className={modalCommonStyles.tag_input_content_inner}>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="+ 追加する"
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryEdit;
