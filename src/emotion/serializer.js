import * as emotion from 'emotion';
import { createSerializer } from './jest';

expect.addSnapshotSerializer(createSerializer(emotion));
