/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, ReactNode, useCallback} from 'react';
import Realm, {Configuration} from 'realm';
import {FlatList, SafeAreaView} from 'react-native';
import {TextInput} from 'elements/TextInput';
import {MultiLineTextInput} from 'elements/MultiLineTextInput';
import {Text} from 'elements/Text';
import {Touchable} from 'elements/Touchable';

class Journal extends Realm.Object {
  id!: ObjectId;
  title!: string;
  content!: string;
  creationDate!: Date;

  static generate(title = 'New Entry', content = ''){
    return {
      id: new Realm.BSON.ObjectID(),
      title,
      content,
      creationDate: new Date(),
    };
  }

  static schema = {
    name: 'Journal',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      title: 'string',
      content: 'string',
      creationDate: 'date',
      items: 'string[]',
    },
  };
}

const configuration: Configuration = {
  schema: [Journal],
  deleteRealmIfMigrationNeeded: true,
};

const realm = new Realm(configuration);

const App: () => ReactNode = () => {
  const [journal, setJournal] = useState<Realm.Results<Journal>>(
    realm.objects(Journal),
  );
  const displayJournal = journal?.[0] ?? null;

  // Initialize data
  useEffect(() => {
    if (journal.length === 0) {
      realm.write(() => {
        realm.create(Journal, Journal.generate());
      });
      setJournal(realm.objects(Journal));
    }
  }, []);
  // Register for changes
  useEffect(() => {
    const handleChange = () => setJournal(realm.objects(Journal));
    journal.addListener(handleChange);
    return () => {
      journal.removeListener(handleChange);
    };
  }, [journal, setJournal]);

  return (
    <SafeAreaView>
      {displayJournal && (
        <>
          <TextInput
            value={displayJournal.title}
            onChangeText={text =>
              realm?.write(() => {
                displayJournal.title = text;
              })
            }
          />
          <MultiLineTextInput
            value={displayJournal.content}
            onChangeText={text =>
              realm?.write(() => {
                displayJournal.content = text;
              })
            }
          />
          <Touchable
            onPress={() => {
              realm?.write(() => {
                realm?.create(Journal, Journal.generate());
              });
            }}>
            <Text>Create New Entry</Text>
          </Touchable>
        </>
      )}
      <FlatList
        data={journal.sorted('creationDate')}
        keyExtractor={item => item?.id.toHexString()}
        renderItem={({item}) => {
          const {title, id} = item;
          return <Item title={title} id={id} />;
        }}
      />
    </SafeAreaView>
  );
};

const Item = React.memo<{title: string; id: ObjectId}>(
  ({title, id}) => {
    console.log('rerendering: ', id.toHexString());
    return (
      <>
        <Text>
          {title} {id.toHexString()}
        </Text>
        <Touchable
          onPress={() => {
            realm?.write(() => {
              realm?.delete(realm.objectForPrimaryKey(Journal, id));
            });
          }}>
          <Text>delete</Text>
        </Touchable>
      </>
    );
  },
  (prevProps, {title, id}) => {
    if (
      title !== prevProps.title ||
      id.toHexString() !== prevProps.id.toHexString()
    ) {
      return false;
    }
    return true;
  },
);

export default App;
