var jsx = false;
var component = '';

var jsxVisitor = {
    JSXElement: {
        enter (path) {
            jsx = true;
        }
    }
};

var objectExpressionVisitor = {
    ObjectMethod: {
        enter (path) {
            if (path.node.key.name === 'render') {
                path.traverse(jsxVisitor);
            }
        }
    }
};

module.exports = function(babel) {
    var t = babel.types;
    return {
        visitor: {
            Program: {
                exit (path) {
                    if (component !== '') {
                        path.node.body.push(
                            t.ifStatement(
                                t.memberExpression(
                                    t.identifier('module'),
                                    t.identifier('hot')
                                ),
                                t.blockStatement([
                                    t.expressionStatement(
                                        t.callExpression(
                                            t.memberExpression(
                                                t.memberExpression(
                                                    t.identifier('module'), t.identifier('hot')
                                                ),
                                                t.identifier('accept')
                                            ),
                                            []
                                        )
                                    ),
                                    t.variableDeclaration(
                                        'var',
                                        [
                                            t.variableDeclarator(
                                                t.identifier('api'),
                                                t.callExpression(
                                                    t.identifier('require'),
                                                    [t.stringLiteral('vue-hot-reload-api')]
                                                )
                                            )
                                        ]
                                    ),
                                    t.variableDeclaration(
                                        'var',
                                        [
                                            t.variableDeclarator(
                                                t.identifier('Vue'),
                                                t.callExpression(
                                                    t.identifier('require'),
                                                    [t.stringLiteral('vue')]
                                                )
                                            )
                                        ]
                                    ),
                                    t.expressionStatement(
                                        t.callExpression(
                                            t.memberExpression(
                                                t.identifier('api'),
                                                t.identifier('install')
                                            ),
                                            [t.identifier('Vue')]
                                        )
                                    ),
                                    t.variableDeclaration(
                                        'var',
                                        [
                                            t.variableDeclarator(
                                                t.identifier('uniqueId'),
                                                t.stringLiteral(component)
                                            )
                                        ]
                                    ),
                                    t.ifStatement(
                                        t.unaryExpression(
                                            '!',
                                            t.memberExpression(
                                                t.memberExpression(
                                                    t.identifier('module'),
                                                    t.identifier('hot')
                                                ),
                                                t.identifier('data')
                                            )
                                        ),
                                        t.blockStatement([
                                            t.expressionStatement(
                                                t.callExpression(
                                                    t.memberExpression(
                                                        t.identifier('api'),
                                                        t.identifier('createRecord')
                                                    ),
                                                    [
                                                        t.identifier('uniqueId'),
                                                        t.identifier(component)
                                                    ]
                                                )
                                            )
                                        ]),
                                        t.blockStatement([
                                            t.expressionStatement(
                                                t.callExpression(
                                                    t.memberExpression(
                                                        t.identifier('api'),
                                                        t.identifier('rerender')
                                                    ),
                                                    [
                                                        t.identifier('uniqueId'),
                                                        t.identifier(component)
                                                    ]
                                                )
                                            ),
                                            t.expressionStatement(
                                                t.callExpression(
                                                    t.memberExpression(
                                                        t.identifier('api'),
                                                        t.identifier('reload')
                                                    ),
                                                    [
                                                        t.identifier('uniqueId'),
                                                        t.identifier(component)
                                                    ]
                                                )
                                            )
                                        ])
                                    )
                                ])
                            )
                        );

                        // Reset component name
                        component = '';
                    }
                }
            },
            VariableDeclarator: {
                enter (path, state) {
                    path.traverse(objectExpressionVisitor);
                    if (jsx) {
                        component = path.node.id.name;
                        jsx = false;
                        if (state.opts.debug) {
                            console.log('Found JSX Component: ', component);
                        }
                    }
                }
            }
        }
    };
};
