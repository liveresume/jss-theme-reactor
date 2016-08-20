/* eslint-env mocha */
import { assert } from 'chai';
import { stub, spy } from 'sinon';
import { createStyleManager } from './styleManager';
import { createStyleSheet } from './styleSheet';

describe('styleManager.js', () => {
  let styleManager;
  let jss;
  let attach;
  let sheetMap = [];

  before(() => {
    attach = stub().returns({ classes: { base: 'base-1234' } });
    jss = { createStyleSheet: stub().returns({ attach }) };
    styleManager = createStyleManager({ jss, sheetMap });
  });

  it('should create a styleManager object', () => {
    assert.strictEqual(typeof styleManager, 'object');
    assert.strictEqual(typeof styleManager.theme, 'object');
    assert.strictEqual(typeof styleManager.jss, 'object');
    assert.strictEqual(typeof styleManager.render, 'function');
    assert.strictEqual(typeof styleManager.getClasses, 'function');
    assert.strictEqual(typeof styleManager.updateTheme, 'function');
    assert.strictEqual(typeof styleManager.prepareInline, 'function');
  });

  describe('render()', () => {
    let styleSheet1;

    before(() => {
      styleSheet1 = createStyleSheet('foo', () => ({
        base: {
          backgroundColor: 'red',
        },
      }));
    });

    it('should render a sheet using the renderer and return the classes', () => {
      const classes = styleManager.render(styleSheet1);

      assert.strictEqual(jss.createStyleSheet.callCount, 1, 'should call jss.createStyleSheet()');
      assert.strictEqual(jss.createStyleSheet.calledWith(styleSheet1.resolveStyles()), true);
      assert.strictEqual(attach.callCount, 1, 'should call jssStyleSheet.attach()');
      assert.strictEqual(sheetMap.length, 1, 'should add a sheetMap item');
      assert.strictEqual(classes.base, 'base-1234', 'should return the className');
    });

    it('should get the classes', () => {
      const classes = styleManager.getClasses(styleSheet1);
      assert.strictEqual(classes.base, 'base-1234', 'should return the className');
    });

    it('should then throw a warning when rendering a sheet with the same name', () => {
      const styleSheet2 = createStyleSheet('foo', () => ({
        base: {
          backgroundColor: 'red',
        },
      }));

      const warningSpy = spy(console, 'error');
      styleManager.render(styleSheet2);
      assert.strictEqual(
        warningSpy.calledWith('Warning: A styleSheet with the name foo already exists.'),
        true
      );
    });
  });
});